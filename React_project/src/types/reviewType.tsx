export interface Review {
    _id: string;
    bookId: string;
    userId: userInfo;
    reviewText: string;
    rating: number;
    createdAt: string;
  }

  interface userInfo {
    _id?: string,
    email: string,
    username: string
  }

  export interface CreateReview {
    id?: string;
    bookId: string;
    userId: userInfo;
    reviewText: string;
    rating: number;
    createdAt?: string;
  }