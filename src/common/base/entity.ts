export interface EntityProps {
  id: number;
}

export class Entity<Props extends EntityProps> {
  id: number;

  constructor(props: Props) {
    this.id = props.id;
  }
}
