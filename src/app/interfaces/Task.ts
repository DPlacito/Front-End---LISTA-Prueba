export interface Task {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  imageURL?: string;
  createdAt?: Date;
  status?: string;
  deleted?: number;
}
