export class QueryResults
{
    page:number; 
    per_page: number;
    total: number;
    total_pages: number;
    data :any []; 

constructor(_page:number, 
    _per_page: number,
    _total: number,
    _total_pages: number,
    _data :any [] )
{
    this.page=_page;
    this.per_page=_per_page;
    this.total=_total;
    this.total_pages=_total_pages;
    this.data=_data;
}

}

