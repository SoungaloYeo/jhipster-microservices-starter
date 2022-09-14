import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'book',
        data: { pageTitle: 'gatewayApp.authorBook.home.title' },
        loadChildren: () => import('./author/book/book.module').then(m => m.AuthorBookModule),
      },
      {
        path: 'author',
        data: { pageTitle: 'gatewayApp.authorAuthor.home.title' },
        loadChildren: () => import('./author/author/author.module').then(m => m.AuthorAuthorModule),
      },
      {
        path: 'tag',
        data: { pageTitle: 'gatewayApp.authorTag.home.title' },
        loadChildren: () => import('./author/tag/tag.module').then(m => m.AuthorTagModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'gatewayApp.storeProduct.home.title' },
        loadChildren: () => import('./store/product/product.module').then(m => m.StoreProductModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
