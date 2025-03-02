declare module 'dom-to-image' {
  export function toPng(node: HTMLElement | SVGElement): Promise<string>
  export function toJpeg(node: HTMLElement | SVGElement): Promise<string>
  export function toBlob(node: HTMLElement | SVGElement): Promise<Blob>
  export function toPixelData(node: HTMLElement | SVGElement): Promise<number[]>
} 