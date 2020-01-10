const NativeUI    = require('NativeUI')
const Textures    = require('Textures'); 
const Patches     = require('Patches');
const Diagnostics = require('Diagnostics');

const Persistence = require('Persistence');
const userScope   = Persistence.userScope;
 
const texture0    = Textures.get('1'); 
const texture1    = Textures.get('2'); 
const texture2    = Textures.get('3'); 

const picker = NativeUI.picker; 
var data = { value: '0' };

const index = 0;

const configuration = { 

  selectedIndex: index, 

  items: [ 
    {image_texture: texture0}, 
    {image_texture: texture1}, 
    {image_texture: texture2}, 
  ]

};

picker.configure(configuration);
picker.visible = true;


userScope.get('data').then(function(result) {
 
  picker.selectedIndex = parseInt(result.value);
  
  }).catch(function(error) {
    picker.selectedIndex = 0; 
  });
  
 picker.selectedIndex.monitor().subscribe(function(index) {
 
  data.value = index.newValue.toString();
  userScope.set('data', data).then(function(result) {
    
    Patches.setScalarValue('selectedButton', index.newValue); // keep my old logic on patch...

  }).catch(function(error) {
 
  });
  
});