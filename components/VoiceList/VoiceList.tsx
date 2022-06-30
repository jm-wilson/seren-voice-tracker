import Image, { StaticImageData } from 'next/image';
import styles from './VoiceList.module.css';

import AmloddPNG from '@/assets/clanImages/Amlodd.png';
import CadarnPNG from '@/assets/clanImages/Cadarn.png';
import CrwysPNG from '@/assets/clanImages/Crwys.png';
import HefinPNG from '@/assets/clanImages/Hefin.png';
import IorwerthPNG from '@/assets/clanImages/Iorwerth.png';
import IthellPNG from '@/assets/clanImages/Ithell.png';
import MeilyrPNG from '@/assets/clanImages/Meilyr.png';
import TrahaearnPNG from '@/assets/clanImages/Trahaearn.png';

interface IVoiceList {
  bgColor: string;
  title: string;
  voices: string[];
}

const VoiceList = ({ title, voices, bgColor }: IVoiceList) => {
  interface IClanImages {
    [key: string]: StaticImageData;
  }

  const clanImages: IClanImages = {
    Amlodd: AmloddPNG,
    Cadarn: CadarnPNG,
    Crwys: CrwysPNG,
    Hefin: HefinPNG,
    Iorwerth: IorwerthPNG,
    Ithell: IthellPNG,
    Meilyr: MeilyrPNG,
    Trahaearn: TrahaearnPNG,
  };

  return (
    <section className={styles.wrapper} style={{ backgroundColor: bgColor }}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {voices.map((voice) => (
          <li className={styles.listItem} key={voice}>
            <figure className={styles.figure}>
              <Image alt={voice} src={clanImages[voice]} height={75} />
              <figcaption>{voice}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default VoiceList;
