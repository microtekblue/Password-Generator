"use server";

import { revalidatePath } from "next/cache";
import {z} from "zod";
import fs from 'fs';
import path from 'path';

const filePathWords = path.resolve(path.join(process.cwd(),'public'), 'agwordlist.txt');
const wordsList = fs.readFileSync(filePathWords, 'utf-8');
const filePathSyllables = path.resolve(path.join(process.cwd(),'public'), 'agsyllables.txt');
const syllablesList = fs.readFileSync(filePathSyllables, 'utf-8');
export async function createPassword(
  prevState: {
    password: string;
  },
  formData: FormData,
) {
  let password = '';
  const schema = z.object({
    passwordType: z.string().min(1),
    length: z.number().gte(3),
    capitalize: z.boolean(),
    fullWords: z.boolean(),
    numbers: z.boolean(),
    symbols: z.boolean()
  });
  const parse = schema.safeParse({
    passwordType: formData.get("passwordType"),
    length: Number(formData.get("length")),
    capitalize: !!formData.get("capitalize"),
    fullWords: !!formData.get("fullWords"),
    numbers: !!formData.get("numbers"),
    symbols: !!formData.get("symbols")
  });

  const error = parse.error?.errors.map(function(err) {
    return err.message;
  });

  if (!parse.success) {
    return { password: `Failed to Generate Password! ${error}` };
  }

  const data = parse.data;

  try {
    // generate password code
    if (data.passwordType === 'Random') {
      password = !error ? generateRandom(data.length, data.numbers, data.symbols) : error[0];
    }
    if (data.passwordType === 'Memorable') {
      password = !error ? generateMemorable(data.length, data.capitalize, data.fullWords) : error[0];
    }
    if (data.passwordType === 'Pin') {
      password = !error ? generatePin(data.length) : error[0];
    }

    revalidatePath("/");
    return { password: `${password}` };
  } catch (e) {
    return { password: "Failed to create password" };
  }
}

function randomNumbers() {
  const array = new Uint32Array(200);
  return crypto.getRandomValues(array);
}

function shuffle(words: string[]) {
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
}
function generatePin(length: number) {
  return randomNumbers().join().replaceAll(',','').substring(0, length);
}

function generateRandom(length: number, numbers: boolean, symbols: boolean) {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charNumbers = '0123456789';
  const charSymbols = '!@#$%^&*()_+{}|:<>?-=[];,./';

  let newSet = charSet;

  if (numbers) {
    newSet += charNumbers;
  }
  if (symbols) {
    newSet += charSymbols;
  }
  if (numbers && symbols) {
    newSet += charNumbers + charSymbols;
  }

  const randomValues = randomNumbers();

  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % newSet.length;
    result += newSet[randomIndex];
  }

  return result;
}

function generateMemorable(length: number, capitalize: boolean, fullWords: boolean) {
  const words = !fullWords ? syllablesList.split('\n') : wordsList.split('\n');
  shuffle(words);
  let selectedWords = words.slice(0, length);
  if (capitalize) {
    selectedWords = selectedWords.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  }
  return selectedWords.join('-');
}