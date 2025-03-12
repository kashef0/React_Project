export interface BookItem {
  totalItems: number;
  items: Item[];
}

export interface Item {
  id: string;
  volumeInfo: BookData;
}


interface imageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
}

export interface BookData {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: imageLinks;
}

export interface Book {
    id: string;
    title: string;
    authors?: string[];
    description?: string;
    image?: string;
  }
  
  export interface BookState {
    searchResults: Book[];
    selectedBook: Book | null;
  }