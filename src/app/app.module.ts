import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { CarrosselComponent } from './componentes/carrossel/carrossel.component';
import { DestaquesComponent } from './componentes/destaques/destaques.component';
import { DetalhesComponent } from './componentes/detalhes/detalhes.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { EfetivarpedidoComponent } from './componentes/efetivarpedido/efetivarpedido.component';
import { ReciboComponent } from './componentes/recibo/recibo.component';
import { BuscacategoriaComponent } from './componentes/buscacategoria/buscacategoria.component';
import { BuscapalavrachaveComponent } from './componentes/buscapalavrachave/buscapalavrachave.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RodapeComponent,
    CarrosselComponent,
    DestaquesComponent,
    DetalhesComponent,
    CarrinhoComponent,
    EfetivarpedidoComponent,
    ReciboComponent,
    BuscacategoriaComponent,
    BuscapalavrachaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
