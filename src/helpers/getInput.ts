import { getInput, InputOptions } from '@actions/core'

/**
 * Get input from github action core
 * @param {string} name The name of the input
 * @param {InputOptions} options The setting of input.
 * @returns {string}
 */
export function input(name: string, options?: InputOptions): string {
  return getInput(name, options)
}
