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
                $('#submit').show()
            }else{
                $('.next').show()
                $('.prev').show()
                $('#submit').hide()
            }
        }
    });
});

$('#submit').hide()
$('#results-wrapper').hide();
const ctx = document.getElementById('resultsChart').getContext('2d');
const myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {},
});

// next carousel item
$('.next').click(function (e) {
    // e.preventDefault();
    // e.stopPropagation();
    $('.carousel').carousel('next');
});

//  prev carousel item
$('.prev').click(function (e) {
    // e.preventDefault();
    // e.stopPropagation();
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
       for (let i = 0; i < finalSums.length; i++) {
           finalSums[i] = finalSums[i] + values[i];
       }
   })
   console.log("final sums: ", finalSums)

   

    let platformArray = [
        {
            platform: 'Facebook',
            value: finalSums[0],
            color: 'rgb(74,101,159)'
        },
        {
            platform: 'Instagram',
            value: finalSums[1],
            color: 'rgb(171,56,143)'
        },
        {
            platform: 'Twitter',
            value: finalSums[2],
            color: 'rgb(29,161,242)'
        },
        {
            platform: 'LinkedIn',
            value: finalSums[3],
            color: 'rgb(40,62,74)'    
        },
        {
            platform: 'Pinterest',
            value: finalSums[4],
            color: 'rgb(196,53,53)'
        },
        {
            platform: 'YouTube',
            value: finalSums[5],
            color: 'rgb(243,0,7)'
        }
    ]

    console.log('platformArray: ', platformArray)

    let sortedArray = platformArray.slice(0)
    sortedArray.sort(function(a,b){
    return b.value-a.value
    })
    console.log('sortedArray: ', sortedArray)



    let newDataSet = {
            data: platformArray.map(e => {
                return e.value
            }),
            backgroundColor: platformArray.map(e => {
                return e.color
            })
        };
    myDoughnutChart.data.datasets.unshift(newDataSet)
    myDoughnutChart.data.labels = platformArray.map(e =>e.platform)
    myDoughnutChart.update()

    

    $('#carousel-wrapper').hide();
    $('#submit').hide();
    $('#results-wrapper').show();

})

$('#edit-responses').on('click', function (event) {
    $('#carousel-wrapper').show();
    $('#submit').show();
    $('#results-wrapper').hide();
})
$('#retake').on('click', function (event) {
    $('.carousel').carousel('set',0)
    $('input:checkbox').prop('checked', false)
    $('#carousel-wrapper').show();
    $('#submit').show();
    $('#results-wrapper').hide();
})
$('#delete-result').on('click', function (event) {
    myDoughnutChart.data.datasets.pop();
    myDoughnutChart.update()
})


