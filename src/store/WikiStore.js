import { makeAutoObservable, runInAction } from 'mobx';

class WikiStore {
  data = null;
  status = 'idle';
  searchValue = '';

  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue = (value) => {
    this.searchValue = value;
  };

  fetchArticles = async () => {
    this.status = 'pending';
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=info&origin=*&format=json&list=search&srsearch=${this.searchValue}&srlimit=10`,
      );
      const result = await response.json();
      runInAction(() => {
        this.data = result;
        this.status = 'succeeded';
      });
    } catch (error) {
      this.status = 'error';
    }
  };
}

export const wikiStore = new WikiStore();
