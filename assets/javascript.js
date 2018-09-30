$(document).ready(function () {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        noWrap: true,
        onCycleTo: function (ele, dragged) {
            const slideIndex = $(ele).index();
            if(slideIndex === 1){
                $('.prev').hide()
            }else if (slideIndex >= 6){
                $('.next').hide()
            }else{
                $('.next').show()
                $('.prev').show()
            }
        }
    });
});

// next carousel item
$('.next').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.carousel').carousel('next');
});

//  prev carousel item
$('.prev').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.carousel').carousel('prev');
});

limitChecks = limits => {
    limits.forEach(limit => {
        $(`input.limit-${limit}`).on('change', function (evt) {
            if ($(this).parent().parent().find('input:checked').length > limit) {
                this.checked = false;
            }
        });

    })
    
}
limitChecks([1,2,3]);

$('#submit').on('click', function(event){
    let finalSums = [0,0,0,0,0,0]
   let checkedInputs = $('#questions').find('input:checked')
   checkedInputs.each((idx, input) =>{
        let values = JSON.parse(input.value)
        console.log(idx, values)
       for (let i = 0; i < finalSums.length; i++) {
           finalSums[i] = finalSums[i] + values[i];
       }
   })
   console.log("final sums: ", finalSums)

   

let platformArray = [
    {
        platform: 'Facebook',
        value: finalSums[0]
    },
    {
        platform: 'Instagram',
        value: finalSums[1]
    },
    {
        platform: 'Twitter',
        value: finalSums[2]
    },
    {
        platform: 'LinkedIn',
        value: finalSums[3]    
    },
    {
        platform: 'Pinterest',
        value: finalSums[4]
    },
    {
        platform: 'YouTube',
        value: finalSums[5]
    }
]

console.log('platformArray: ', platformArray)

let sortedArray = platformArray.slice(0)
sortedArray.sort(function(a,b){
   return b.value-a.value
})
console.log('sortedArray: ', sortedArray)

})
