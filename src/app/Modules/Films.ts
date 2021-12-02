export class film {
  id: number;
  vote_average: number;
  title: String;
  poster_path: String;
  original_title: String;
  overview: String;
  release_date: String;

  constructor(id:number,vote_average: number,title: String,poster_path: String,original_title: String,overview: String,release_date: String
      ) {
      this.id=id;
      this.vote_average=vote_average;
      this.title=title;
      this.poster_path=poster_path;
      this.original_title=original_title;
      this.overview=overview;
      this.release_date=release_date;
  }
}