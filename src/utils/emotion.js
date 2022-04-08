const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const emotionList = [
    {
        emotion_id : 1,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion/emotion1.png`,
        emotion_descript : 'Happiness'
    },
    {
        emotion_id : 2,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion/emotion2.png`,
        emotion_descript : 'Good'
    },
    {
        emotion_id : 3,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion/emotion3.png`,
        emotion_descript : 'So-so'
    },
    {
        emotion_id : 4,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion/emotion4.png`,
        emotion_descript : 'Bad'
    },
    {
        emotion_id : 5,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion/emotion5.png`,
        emotion_descript : 'Mad'
    },
]