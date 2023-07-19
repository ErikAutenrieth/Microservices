import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'MONGODB_ATLAS_AZURE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(""),
  },
];