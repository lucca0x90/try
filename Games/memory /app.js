
document.addEventListener('DOMContentLoaded', () => {
//将图片的位置定好，每个pic自带click，两个pic之间比较，用name; 同一个id为same
    const pictures = [
        {
            name: 'Black Widow',
            img: 'imgs/Black Widow.jpeg'
        },
        {
            name: 'Captain America',
            img: 'imgs/Captain America.jpeg'
        },
        {
            name: 'Doctor Strange',
            img: 'imgs/Doctor Strange.jpeg'
        },
        {
            name: 'Hulk',
            img: 'imgs/Hulk.jpeg'
        },
        {
            name: 'Iron Man',
            img: 'imgs/Iron Man.jpeg'
        },
        {
            name: 'Ms. Marvel',
            img: 'imgs/Ms. Marvel.jpeg'
        },
        {
            name: 'Spider Man',
            img: 'imgs/Spider Man.jpeg'
        },
        {
            name: 'Thor',
            img: 'imgs/Thor.jpeg'
        },
        {
            name: 'Black Widow',
            img: 'imgs/Black Widow.jpeg'
        },
        {
            name: 'Captain America',
            img: 'imgs/Captain America.jpeg'
        },
        {
            name: 'Doctor Strange',
            img: 'imgs/Doctor Strange.jpeg'
        },
        {
            name: 'Hulk',
            img: 'imgs/Hulk.jpeg'
        },
        {
            name: 'Iron Man',
            img: 'imgs/Iron Man.jpeg'
        },
        {
            name: 'Ms. Marvel',
            img: 'imgs/Ms. Marvel.jpeg'
        },
        {
            name: 'Spider Man',
            img: 'imgs/Spider Man.jpeg'
        },
        {
            name: 'Thor',
            img: 'imgs/Thor.jpeg'
        }
    ]
    pictures.sort(() => 0.5 - Math.random());

    const picture = document.querySelector(".pictures");
    const result = document.querySelector(".result");
    const times = document.querySelector(".times");
    var chosenPics = [];
    var chosenId = [];
    var score = 0;
    var time = 0;

    function prepare() {
        for(let i = 0; i < pictures.length; i++) {
            var pic = document.createElement('img');
            pic.setAttribute('src', './imgs/marwel.jpeg');
            pic.setAttribute('data-id', i);
            pic.addEventListener('click', filp)
            picture.appendChild(pic);
        }
        result.textContent = score;
        times.textContent = time;
    }
    
    function filp() {
        var picId = this.getAttribute('data-id');
        chosenPics.push(pictures[picId].name);
        chosenId.push(picId);
        console.log(chosenId,chosenPics)
        this.setAttribute('src', pictures[picId].img);
        if(chosenPics.length === 2) {
            setTimeout(starttMatch, 500);
            time++;
        }
        
    }

    function starttMatch() {
        var pics = document.querySelectorAll('img');
        const optionOneId = chosenId[0];
        const optionTwoId = chosenId[1];
        console.log(optionOneId,optionTwoId)
        if (optionOneId == optionTwoId) {
            pics[optionOneId].setAttribute('src', 'imgs/marwel.jpeg');
            pics[optionTwoId].setAttribute('src', 'imgs/marwel.jpeg');
            alert('the same pic.')
        } else if(chosenPics[0] === chosenPics[1]) {
            pics[optionOneId].setAttribute('src', 'imgs/nothing.jpeg');
            pics[optionTwoId].setAttribute('src', 'imgs/nothing.jpeg');
            pics[optionOneId].removeEventListener('click', filp);
            pics[optionTwoId].removeEventListener('click', filp);
            score++;
        } else {
            pics[optionOneId].setAttribute('src', 'imgs/marwel.jpeg');
            pics[optionTwoId].setAttribute('src', 'imgs/marwel.jpeg');
            alert('Please, try again!')
        }
        chosenPics = [];
        chosenId = [];
        result.textContent = score;
        times.textContent = time;
        if (score === pictures.length/2) {
            result.textContent = `${score} Great, you complete!`;
        }
    }
    
    prepare();
})
