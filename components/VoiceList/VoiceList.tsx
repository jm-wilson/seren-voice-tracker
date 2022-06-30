import Image from 'next/image';
import styles from './VoiceList.module.css';

interface IVoiceList {
  bgColor: string;
  title: string;
  voices: string[];
}

const VoiceList = ({ title, voices, bgColor }: IVoiceList) => {
  return (
    <section className={styles.wrapper} style={{ backgroundColor: bgColor }}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {voices.map((voice) => (
          <li key={voice}>
            <figure className={styles.figure}>
              <Image alt={voice} src={`/images/${voice}.png`} layout='fixed' height={75} width={75} />
              <figcaption>{voice}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VoiceList;
