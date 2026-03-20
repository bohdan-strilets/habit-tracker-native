export type FrequencySegmentValue = 'daily' | 'weekly';

export type FrequencySegmentControlProps = {
  value: FrequencySegmentValue;
  onChange: (value: FrequencySegmentValue) => void;
};
