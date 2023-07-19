export function types(): string {
  return 'types';
}

export class Customer {
  private name: string;
  private email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  toString(): string {
    return this.name + ' (' + this.email + ')';
  }
}

