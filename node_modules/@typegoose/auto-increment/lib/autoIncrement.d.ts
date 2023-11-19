import * as mongoose from 'mongoose';
import type { AutoIncrementIDOptions, AutoIncrementOptionsSimple } from './types';
/**
 * Because since node 4.0.0 the internal util.is* functions got deprecated
 * @param val Any value to test if null or undefined
 */
export declare function isNullOrUndefined(val: unknown): val is null | undefined;
/**
 * The Plugin - Simple version
 * Increments an value each time it is saved
 * @param schema The Schema
 * @param options The Options
 */
export declare function AutoIncrementSimple(schema: mongoose.Schema<any>, options: AutoIncrementOptionsSimple[] | AutoIncrementOptionsSimple): void;
export declare const AutoIncrementIDSkipSymbol: unique symbol;
/**
 * The Plugin - ID
 * Increments an counter in an tracking collection
 * @param schema The Schema
 * @param options The Options
 */
export declare function AutoIncrementID(schema: mongoose.Schema<any>, options: AutoIncrementIDOptions): void;
export * from './types';
