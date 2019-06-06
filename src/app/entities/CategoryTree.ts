export class CategoryTree {
  public name: string;
  public depth: number;
  public children: CategoryTree[];

  constructor(name: string, children: CategoryTree[] = [], depth = -1) {
    this.name = name;
    this.depth = depth;
    this.children = children;
  }
}
