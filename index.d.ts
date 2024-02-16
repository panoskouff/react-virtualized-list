/**
 * Combine two types. If a key is in both types, the one from
 * the second type is used.
 *
 * @example
 *   Merge<SomeModel, { extra: 'keys' }>
 */
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

/**
 * Alias a primitive type as an opaque type, ensuring that other values of the
 * same primitive type cannot be used in its stead.
 *
 * @example
 *   type DateTimeString = Opaque<'DateTime', string>
 *   type AccountNumber = Opaque<'Account', number>
 */
type Opaque<K, T> = T & { __TYPE__: K }

/**
 * // Usage
 * let div: ElementType<'div'>; // Type is HTMLDivElement
 * let img: ElementType<'img'>; // Type is HTMLImageElement
 */
type ElementType<T extends keyof HTMLElementTagNameMap> =
  HTMLElementTagNameMap[T]
