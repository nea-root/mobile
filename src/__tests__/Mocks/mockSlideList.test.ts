import { mockSlideList, SlideList } from '@Mock/SlideList/mockSlideList';
import { UserFlowTypes } from '@/Navigators/utils';

describe('mockSlideList', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(mockSlideList)).toBe(true);
    expect(mockSlideList.length).toBeGreaterThan(0);
  });

  it('each entry has required fields', () => {
    mockSlideList.forEach((slide: SlideList) => {
      expect(typeof slide.id).toBe('number');
      expect(typeof slide.heading).toBe('string');
      expect(typeof slide.subheading).toBe('string');
      expect(slide.image).toBeTruthy();
      expect(typeof slide.flowType).toBe('string');
    });
  });

  it('victim slides have 3 entries', () => {
    const victim = mockSlideList.filter(s => s.flowType === UserFlowTypes.victim);
    expect(victim).toHaveLength(3);
  });

  it('volunteer slides have 3 entries', () => {
    const volunteer = mockSlideList.filter(s => s.flowType === UserFlowTypes.volunteer);
    expect(volunteer).toHaveLength(3);
  });

  it('lawyer slides have 3 entries', () => {
    const lawyer = mockSlideList.filter(s => s.flowType === UserFlowTypes.lawyer);
    expect(lawyer).toHaveLength(3);
  });

  it('therapist slides have 3 entries', () => {
    const therapist = mockSlideList.filter(s => s.flowType === UserFlowTypes.therapist);
    expect(therapist).toHaveLength(3);
  });

  it('victim slides have non-empty headings', () => {
    const victim = mockSlideList.filter(s => s.flowType === UserFlowTypes.victim);
    victim.forEach(s => expect(s.heading.length).toBeGreaterThan(0));
  });

  it('volunteer slides have non-empty subheadings', () => {
    const volunteer = mockSlideList.filter(s => s.flowType === UserFlowTypes.volunteer);
    volunteer.forEach(s => expect(s.subheading.length).toBeGreaterThan(0));
  });

  it('all IDs are unique', () => {
    const ids = mockSlideList.map(s => s.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('flowTypes are only valid roles', () => {
    const validRoles = Object.values(UserFlowTypes);
    mockSlideList.forEach(s => {
      expect(validRoles).toContain(s.flowType);
    });
  });

  it('first victim slide mentions "Live Chat"', () => {
    const victim = mockSlideList.filter(s => s.flowType === UserFlowTypes.victim);
    expect(victim[0].heading).toBe('Live Chat');
  });

  it('first volunteer slide heading is not empty', () => {
    const volunteer = mockSlideList.filter(s => s.flowType === UserFlowTypes.volunteer);
    expect(volunteer[0].heading).toBeTruthy();
  });
});
