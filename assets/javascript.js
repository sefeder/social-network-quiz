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
    $('#results-wrapper').hide();
    $('#inner-loading-wrapper').hide();
});

$('#submit').hide()
// $('#results-wrapper').hide();
// const ctx = document.getElementById('resultsChart').getContext('2d');
// const myDoughnutChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {},
// });

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
    let finalSums = [0,0,0,0]
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
            platform: 'Pinterest',
            value: finalSums[3],
            color: 'rgb(196,53,53)'
        }
    ]

    console.log('platformArray: ', platformArray)

    let sortedArray = platformArray.slice(0)
    sortedArray.sort(function (a, b) {
        return b.value - a.value
    })
    console.log('sortedArray: ', sortedArray)

    $('#winner-image').attr('src', `./assets/images/${sortedArray[0].platform}.png`)
    $('#winner-text').text(sortedArray[0].platform)
    $('#other-networks-text').text(`Once you\'ve conquered ${sortedArray[0].platform}, we recommend adding these others in this order:`)
    $('#first-runnerup-image').attr('src', `./assets/images/${sortedArray[1].platform}.png`)
    $('#first-runnerup-text').text(sortedArray[1].platform)
    $('#second-runnerup-image').attr('src', `./assets/images/${sortedArray[2].platform}.png`)
    $('#second-runnerup-text').text(sortedArray[2].platform)
    $('#third-runnerup-image').attr('src', `./assets/images/${sortedArray[3].platform}.png`)
    $('#third-runnerup-text').text(sortedArray[3].platform)

    $('#carousel-wrapper').hide();
    $('#submit').hide();
    $('#inner-loading-wrapper').show();

    setTimeout(() => {
        $('#inner-loading-wrapper').hide();
        $('#results-wrapper').show();
    }, 3000);

    // let newDataSet = {
    //         data: platformArray.map(e => {
    //             return e.value
    //         }),
    //         backgroundColor: platformArray.map(e => {
    //             return e.color
    //         })
    //     };
    // myDoughnutChart.data.datasets.unshift(newDataSet)
    // myDoughnutChart.data.labels = platformArray.map(e =>e.platform)
    // myDoughnutChart.update()

})

// $('#edit-responses').on('click', function (event) {
//     $('#carousel-wrapper').show();
//     $('#submit').show();
//     $('#results-wrapper').hide();
// })
// $('#retake').on('click', function (event) {
//     $('.carousel').carousel('set',0)
//     $('input:checkbox').prop('checked', false)
//     $('#carousel-wrapper').show();
//     $('#submit').show();
//     $('#results-wrapper').hide();
// })
// $('#delete-result').on('click', function (event) {
//     myDoughnutChart.data.datasets.pop();
//     myDoughnutChart.update()
// })


