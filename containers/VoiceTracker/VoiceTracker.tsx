import VoiceList from '@/components/VoiceList/VoiceList';

import { formatTimeString } from '@/utils/formatters';
import { VoicesData } from '@/utils/globalInterfaces';

interface IVoiceTracker {
  currentVoices: VoicesData;
  lastVoices: VoicesData;
}

const VoiceTracker = ({ currentVoices, lastVoices }: IVoiceTracker) => {
  const nextChangeStart = new Date();
  const nextChangeEnd = new Date();

  nextChangeStart.setHours(nextChangeStart.getHours() + 1); // Next change starts at the top of the next hour
  nextChangeEnd.setHours(nextChangeStart.getHours() + 1); // Next change ends an hour after it starts

  const nextStartString = formatTimeString(nextChangeStart);
  const nextEndString = formatTimeString(nextChangeEnd);
  const nextFullString = `${nextStartString} to ${nextEndString}`;

  const currentlyActiveArray = [currentVoices.district1, currentVoices.district2];
  const nextCooldownArray = [
    currentVoices.district1,
    currentVoices.district2,
    lastVoices.district1,
    lastVoices.district2,
  ];

  const allClansArray = ['Amlodd', 'Cadarn', 'Crwys', 'Hefin', 'Iorwerth', 'Ithell', 'Meilyr', 'Trahaearn'];
  const possiblyActiveArray = allClansArray.filter((clan) => !nextCooldownArray.includes(clan));

  return (
    <section>
      <VoiceList bgColor='#0ff1ce50' title='Currently active' voices={currentlyActiveArray} />
      <VoiceList bgColor='#fed02450' title={`Available ${nextFullString}`} voices={possiblyActiveArray} />
      <VoiceList bgColor='#f00b4250' title={`On cooldown ${nextFullString}`} voices={nextCooldownArray} />
    </section>
  );
};

export default VoiceTracker;
