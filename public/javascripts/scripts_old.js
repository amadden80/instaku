// function writeHaiku(haikuBody){
//   $.ajax({
//     method: 'post',
//     dataType: 'json',
//     url: '/api/haikus',
//     data: {
//       haiku: {body: haikuBody}
//     },
//     success: function(data){
//       console.log(data);
//     }
//   });
// }
//
// function setHaikyWriterHandler(){
//   $('form#haiku').on('submit', function(e){
//     console.log('Writing Attempted');
//     e.preventDefault();
//     var haikuBody = $(this).find('textarea[name="haiku[body]"]').val();
//     writeHaiku(haikuBody);
//   });
// }
//
// $(function(){
//   $('.user-manage-prompt#welcome').hide();
//   setHaikyWriterHandler();
// });
