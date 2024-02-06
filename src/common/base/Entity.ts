export interface EntityProps {
  id: number;
}

export class Entity<Props extends EntityProps> {
  constructor(readonly id: number) {}
}
