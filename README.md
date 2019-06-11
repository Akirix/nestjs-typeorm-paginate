# typeorm paginate

<a href="https://travis-ci.org/bashleigh/nestjs-typeorm-paginate"><img src="https://travis-ci.org/bashleigh/nestjs-typeorm-paginate.svg?branch=master"/></a>
<a href="https://www.npmjs.com/package/nestjs-typeorm-paginate"><img src="https://img.shields.io/npm/v/nestjs-typeorm-paginate.svg"/></a>
<a href='https://coveralls.io/github/bashleigh/nestjs-typeorm-paginate?branch=master'><img src='https://coveralls.io/repos/github/bashleigh/nestjs-typeorm-paginate/badge.svg?branch=master' alt='Coverage Status' /></a>

I forked this from <a href="https://github.com/bashleigh" >Bashleigh</a> to use for easy pagination.

## Install 

While connected to our company registry (Verdaccio)..

```bash
$ npm install typeorm-paginate
```

## Usage

##### Service
```ts
import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm';
import { paginate, Pageable, Page } from 'typeorm-paginate';

@injectable()
export class CatService {

  constructor (
    @InjectRepository( 'Cat' ) private readonly repository: Repository<imodel.Cat>
  ) {}

  async paginate( pageable: Pageable ): Promise<Page<imodel.Cat>> {
    return await paginate<imodel.Cat>( this.repository, pageable );
  }
}
```

##### Controller
```ts
import { Controller, Get, Query } from 'inversify-restify-utils';

@Controller( '/cats' )
export class CatsController {

  constructor( private readonly catService: iservice.Cat ) {}
  
  @Get( '/withNineLives' )
  async index( @Query( 'page' ) page: number = 0, @Query( 'limit' ) limit: number = 10 ) {
    limit = limit > 100 ? 100 : limit;
    return await this.catService.getAllCatsWithNineLives( { page, limit, route: 'http://cats.com/cats' } );
  }
}
```

### Example response

```json
{
  "items": [
    {
      "lives": 9,
      "type": "tabby",
      "name": "Bobby"
    },
    {
      "lives": 2,
      "type": "Ginger",
      "name": "Garfield"
    },
    {
      "lives": 6,
      "type": "Black",
      "name": "Witch's mate"
    },
    {
      "lives": 7,
      "type": "Purssian Grey",
      "name": "Alisdaya"
    },
    {
      "lives": 1,
      "type": "Alistair",
      "name": "ali"
    },
    ...
  ],
  "itemCount": 10, 
  "total": 20,
  "pageCount": 2, 
  "next": "http://cats.com/cats?page=2",
  "previous": ""
}
```
`items` An array of SomeEntity  
`itemCount` Length of items array  
`total` The total amount of SomeEntity  
`pageCount` total number of pages (total / limit)  
`next` a url for the next page to call | Blank if no page to call  
`previous` a url for the previous page to call | Blank if no previous to call  

## Find Parameters

```ts
@Injectable()
export class CatService {
  constructor (
    @InjectRepository( 'Cat' ) private readonly repository: Repository<imodel.Cat>,
  ) {}

  async getAllCatsWithNineLives( pageable: Pageable ): Promise<Page<imodel.Cat>> {
    return await paginate<imodel.Cat>( this.repository, pageable, {
        lives: 9
    } );
  }
}
```
