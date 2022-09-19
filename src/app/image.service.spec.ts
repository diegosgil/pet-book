import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [ImageService],
    });
    service = TestBed.inject(ImageService);
  });

  it('Cuando inicialice la aplicacion, debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe("Se debe obtener las imagenes", () => {
    it('Debe retornar las 5 imagenes', () => {
      let imagenes = service.getImages();
    expect(imagenes.length).toEqual(5);
    })
  });

  describe("Se debe obtener la imagen", () => {
    it('Devolver la imagen de un gato al ingresar su respectivo id', () => {
      let imagen = service.getImage(3);
      expect(imagen.id).toEqual(3);
    });

    it('Devolver la imagen de un perro al ingresar su respectivo id', () => {
      let imagen = service.getImage(2);
      expect(imagen.id).toEqual(2);
    });

    it('Devolver "indefinido" al ingresar un id que no esta dentro de la lista', () => {
      let id = 8;
      let imagen = service.getImage(id);
      expect(imagen).toEqual(undefined);
    });
  });

});

