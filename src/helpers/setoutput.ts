import { setOutput } from '@actions/core';

/**
 * Set output to use it outside, in workflow
 * @param {string} name
 * @param {string} context
 */
export function output(name: string, context: string): void {
  setOutput(name, context);
}
