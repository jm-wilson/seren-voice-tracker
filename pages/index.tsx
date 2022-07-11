import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import VoiceTracker from '@/containers/VoiceTracker/VoiceTracker';
import styles from '@/styles/Home.module.css';
import { formatShortDateTimeString, formatTimeString } from '@/utils/formatters';
import { VoicesData } from '@/utils/globalInterfaces';

interface IHome {
  currentVoices: VoicesData;
  dateBuilt: string;
  lastVoices: VoicesData;
  nextStart: string;
  nextEnd: string;
}

export default function Home({ currentVoices, dateBuilt, lastVoices, nextStart, nextEnd }: IHome) {
  const [dateBuiltString, setDateBuiltString] = useState('');
  const [nextStartString, setNextStartString] = useState('');
  const [nextEndString, setNextEndString] = useState('');

  const nextFullString = `${nextStartString} to ${nextEndString}`;

  useEffect(() => {
    setDateBuiltString(formatShortDateTimeString(new Date(dateBuilt)));
    setNextStartString(formatTimeString(new Date(nextStart)));
    setNextEndString(formatTimeString(new Date(nextEnd)));
  }, [dateBuilt, nextStart, nextEnd]);

  return (
    <>
      <Head>
        <title>Voice of Seren Tracker</title>
        <meta name='description' content='See which Voices of Seren are active, and which ones are on cooldown' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <section className={styles.detailsWrapper}>
          <section className={styles.details}>
            <h1 className={styles.title}>Seren Voice Tracker</h1>
            <p>
              This page is updated hourly with data from the same source used by the{' '}
              <a href='https://runescape.wiki/'>RuneScape Wiki</a>. As noted on the wiki&apos;s{' '}
              <a href='https://runescape.wiki/w/Voice_of_Seren'>Voice of Seren</a> page, it may be incorrect for the
              first hour after a game update. It will be correct after another hour.
            </p>
            <p>
              There are 8 voices total, and 2 are active at any time. After a voice has been active, it goes on cooldown
              for 2 hours. Knowing this, we can exclude the 2 current voices and the 2 previous voices in order to
              predict which voices will be available for the next change.
            </p>
          </section>
          <section className={styles.details}>
            <h2 className={styles.title}>More info</h2>
            <p>
              {' '}
              This project is open source and issues can be reported through{' '}
              <a
                className={styles.textLink}
                rel='noreferrer'
                href='https://github.com/jm-wilson/seren-voice-tracker'
                target='_blank'
              >
                GitHub
              </a>
              .
            </p>
            <p>
              {' '}
              Built by{' '}
              <a className={styles.textLink} rel='noreferrer' href='https://www.jwils.xyz/' target='_blank'>
                Joe Wilson
              </a>{' '}
              with{' '}
              <a className={styles.textLink} rel='noreferrer' href='https://nextjs.org/' target='_blank'>
                NextJS
              </a>{' '}
              and{' '}
              <a className={styles.textLink} rel='noreferrer' href='https://api.weirdgloop.org/' target='_blank'>
                Weird Gloop&apos;s API
              </a>
              .
            </p>
            <p>Last updated: {dateBuiltString}</p>
          </section>
        </section>

        <VoiceTracker currentVoices={currentVoices} lastVoices={lastVoices} nextFullString={nextFullString} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<IHome> = async () => {
  const response = await fetch('https://api.weirdgloop.org/runescape/vos/history');
  const voicesData = (await response.json()).data;

  if (!response.ok) throw new Error(`Failed to fetch voice history (${response.status})`);

  const currentVoices = voicesData[0];
  const lastVoices = voicesData[1];

  const dateBuilt = new Date().toJSON();

  const nextChangeStart = new Date();
  const nextChangeEnd = new Date();

  nextChangeStart.setHours(nextChangeStart.getHours() + 1); // Next change starts at the top of the next hour
  nextChangeEnd.setHours(nextChangeStart.getHours() + 1); // Next change ends an hour after it starts

  const nextStart = nextChangeStart.toJSON();
  const nextEnd = nextChangeEnd.toJSON();

  return {
    props: { currentVoices, lastVoices, dateBuilt, nextStart, nextEnd },
  };
};
