export interface EntityProps {
  id: number;
}

export class Entity<T, Props extends EntityProps> {
  id: number;

  constructor(props: Props) {
    this.id = props.id;
  }
}
