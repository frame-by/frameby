(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션들의 높이값의 합
    let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)
    let enterNewScene = false; // 새로운 scene이 시작된 순간 true   



// sceneInfo 추가내용 적용 후
const sceneInfo = [
    {
        // 0
        type: 'sticky',
        heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
            container: document.querySelector('#scroll-section-0'),
            messageA: document.querySelector('#scroll-section-0 .main-message.a'),
            messageB: document.querySelector('#scroll-section-0 .main-message.b'),
            messageC: document.querySelector('#scroll-section-0 .main-message.c'),
            messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            canvas: document.querySelector('#video-canvas-0'),
            context: document.querySelector('#video-canvas-0').getContext( '2d' ),
            videoImages: []
        },
        values: {
            videoImagesCount: 426,
            imageSequence: [0, 425],
            canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
            messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
            messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
            messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
            messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
            messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
            messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
            messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
            messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
            messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
            messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
            messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
            messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
            messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
            messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
            messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
        }
    },
    {
        // 1
        type: 'normal',
        // heightNum: 5, // type normal에서는 필요 없음
        scrollHeight: 0,
        objs: {
            container: document.querySelector('#scroll-section-1'),
            content: document.querySelector('#scroll-section-1 .description')
        }
    },
    {
        // 2
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector('#scroll-section-2'),
            messageA: document.querySelector('#scroll-section-2 .a'),
            messageB: document.querySelector('#scroll-section-2 .b'),
            messageC: document.querySelector('#scroll-section-2 .c'),
            pinB: document.querySelector('#scroll-section-2 .b .pin'),
            pinC: document.querySelector('#scroll-section-2 .c .pin'),
            canvas: document.querySelector('#video-canvas-1'),
            context: document.querySelector('#video-canvas-1').getContext( '2d' ),
            videoImages: []
        },
        values: {
            videoImagesCount: 426,
            imageSequence: [0, 425],
            canvas_opacity_in: [0, 1, { start: 0, end: 0.5 }],
            canvas_opacity_out: [1, 0, { start: 0.85, end: 1 }],
            messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
            messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
            messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
            messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
            messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
            messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
            messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
            messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
            messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
            messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
            messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
            messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
            pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
            pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
            pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
            pinB_opacity_out: [0, 1, { start: 0.58, end: 0.63 }],
            pinC_opacity_out: [0, 1, { start: 0.85, end: 0.9 }]
        }
    },

    {
        // 3
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector('#scroll-section-3'),
            canvasCaption: document.querySelector('.canvas-caption'),
            canvas: document.querySelector('.image-blend-canvas'),
            context: document.querySelector('.image-blend-canvas').getContext('2d'),
            imagesPath: [
                './img/004/airbumper_all.jpg',
                './img/004/airbumper_all.jpg'
            ],
            images: []
        },
        values: {
            

        }
    }
];

function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImagesCount; i++) {
        imgElem = new Image(); 
        imgElem.src = `./img/003/IMG_${1001 + i}.jpg`;
        sceneInfo[0].objs.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImagesCount; i++) {
        imgElem2 = new Image(); 
        imgElem2.src = `./img/003/IMG_${1001 + i}.jpg`;
        sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    

}

setCanvasImages();


	function setLayout() {
		// 각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			if (sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			} else if (sceneInfo[i].type === 'normal')  {
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
			}
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}

		yOffset = window.pageYOffset;

		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
        document.body.setAttribute('id', `show-scene-${currentScene}`);

        const heightRatio = window.innerHeight / 1440;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        
    } 

    function calcValues(values, currentYOffset) {
        let rv;
        //현재 씬 (스크롤 섹션)에서 스크롤퇸 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        
        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            
            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0]; 
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        
        return rv;
    }

// playAnimation 추가내용 적용 후
function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
        case 0:
            // console.log('0 play');
            let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
            objs.context.drawImage(objs.videoImages[sequence], 0, 0);
            objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

            if (scrollRatio <= 0.22) {
                // in
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.42) {
                // in
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.62) {
                // in
                objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.82) {
                // in
                objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
            }

            break;

            case 2:
            // console.log('2 play');
            let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
            objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

            if (scrollRatio <= 0.5) {
                //in
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
            } else {
                //out
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
            }

            if (scrollRatio <= 0.32) {
                // in
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
            } else {
                // out
                objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
            }

            if (scrollRatio <= 0.67) {
                // in
                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
            } else {
                // out
                objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
            }

            if (scrollRatio <= 0.93) {
                // in
                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
            } else {
                // out
                objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
            }

            break;

            case 3:
                //console.log('3 play')
                //가로세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heigthRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                if (widthRatio <= heigthRatio){
                    // 캔버스보다 브라우저 창이 홀쭉한 경우
                    canvasScaleRatio = heigthRatio;
                } else {
                    // 캔버스보다 브라우저 창이 홀쭉한 경우
                    canvasScaleRatio = widthRatio;
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`

                break;
        }
    }

    function scrollLoop() { 
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }    

        if (enterNewScene) return;

        playAnimation();

    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop(); 
    });
   // window.addEventListener('DOMContntLoaded', setLayout);
    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });
    window.addEventListener('resize', setLayout);

})();