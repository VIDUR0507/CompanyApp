import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  constructor() {}
  async saveIntoStorage(key: string, value: any) {
    const item = await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  }

  async getfromStorage(key: string) {
    const item: any = await Preferences.get({ key });
    return JSON.parse(item.value);
  }

  async removefromStorage(key: string) {
    const item = await Preferences.remove({ key });
  }

  async clearfromStorage() {
    const item = await Preferences.clear();
  }
}
