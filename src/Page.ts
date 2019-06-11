export class Page<Entity> {
  constructor(
    public readonly items: Entity[],
    public readonly itemCount: number,
    public readonly totalItems: number,
    public readonly pageCount: number,
    public readonly next?: string,
    public readonly previous?: string
  ) {}
}
