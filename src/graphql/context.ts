import { Photon } from '@prisma/photon';
import * as dotenv from 'dotenv';

dotenv.config();

const photon = new Photon();

export interface Context {
  photon: Photon;
}

export default {
  db: photon,
};
