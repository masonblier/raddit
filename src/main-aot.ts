// import './polyfills';
import 'reflect-metadata';
import { platformBrowser }    from '@angular/platform-browser';
import { enableProdMode }    from '@angular/core';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
console.log('Running AOT compiled');

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
