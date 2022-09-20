import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ImageService } from '../image.service';
import { GalleryComponent } from './image-gallery.component';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

describe('ImageGalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let service: ImageService;
  let router: Router;
  let location: Location;

  @Pipe({name: 'filterimages'})
  class MockedFilterimagesPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
      if(filter === 'all'){ return items } else
      return items.filter(item =>{
        return item.brand === filter;
      });
    }
  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([{path: 'image/:id', component: class Dummy{}}]) ],
      declarations: [ GalleryComponent, MockedFilterimagesPipe],
      providers: [ImageService]
    })
    .compileComponents();

    service = TestBed.inject(ImageService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    spyOn(service, "getImages").and.returnValue([
      { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },
      { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
      { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" },
      { "id": 4, "brand": "gato", "url": "assets/images/gato1.jpg" },
      { "id": 5, "brand": "gato", "url": "assets/images/gato2.jpeg" }
    ]);

      router.initialNavigation();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe filtrar todas las mascotas al hacer click en el boton All', () => {
    let btnAll = fixture.debugElement.queryAll(By.css('button.btn'))[0];
    btnAll.nativeElement.click();
    fixture.detectChanges();
    let imagenes = fixture.debugElement.queryAll(By.css('.img'));
    expect(imagenes.length).toEqual(5);
  })

  it('Debe filtrar todos los perros unicamente al hacer click en el boton Perro', () => {
    let btnPerro = fixture.debugElement.queryAll(By.css('button.btn'))[1];
    btnPerro.nativeElement.click();
    fixture.detectChanges();
    let imagenes = fixture.debugElement.queryAll(By.css('.img'));
    expect(imagenes.length).toEqual(3);
  })

  it('Debe filtrar todos los gatos unicamente al hacer click en el boton Gato', () => {
    let btnGato = fixture.debugElement.queryAll(By.css('button.btn'))[2];
    btnGato.nativeElement.click();
    fixture.detectChanges();
    let imagenes = fixture.debugElement.queryAll(By.css('.img'));
    expect(imagenes.length).toEqual(2);
  })
});
