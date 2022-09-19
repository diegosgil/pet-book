import { FilterimagesPipe } from './filterimages.pipe';
//import {TestBed} from '@angular/core/testing';

describe('FilterimagesPipe', () => {
  let pipe: FilterimagesPipe;

  beforeEach(() => {
		pipe = new FilterimagesPipe();
	});

  it('Debe crear una instancia del filtro, cuando inicie el pipe', () => {
    //const pipe = new FilterimagesPipe();
    expect(pipe).toBeTruthy();
  });

  it('Al enviar "all" debe mostrar las 5 imagenes existentes', () => {
    const pipe = new FilterimagesPipe();  //ARRANGE
    let call = pipe.transform(Imagenes, 'all')  //ACT
    expect(call).toEqual(Imagenes);   //ASSERT
  });

  it('Al enviar "perro" debe traer las 3 imagenes de perros existentes', () => {
  		expect(pipe.transform(Imagenes, 'perro').length).toBe(3);
  });

  it('Al enviar "gato" debe traer las 2 imagenes de gatos existentes', () => {
  		expect(pipe.transform(Imagenes, 'gato').length).toBe(2);
  });

  //TestDoubles
  const Imagenes = [
    { id: 1, brand: 'perro', url: 'assets/images/perro1.jpg' },
    { id: 2, brand: 'perro', url: 'assets/images/perro2.jpg' },
    { id: 3, brand: 'perro', url: 'assets/images/perro3.jpg' },
    { id: 4, brand: 'gato', url: 'assets/images/gato1.jpg' },
    { id: 5, brand: 'gato', url: 'assets/images/gato2.jpg' },
  ];
});


