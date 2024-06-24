import {DateProviderMock} from "./date-provider.mock";
import {beforeAll, describe} from "vitest";


describe('dateProvider', () => {
  let dateProvider: DateProviderMock;
  const now = new Date('2021-01-01T00:00:00Z');
  beforeAll(() => {
    dateProvider = new DateProviderMock(now);
  });

  it('should be define', () => {
    expect(dateProvider).toBeDefined();
  });

  describe('now method', () => {
    it('should return Date object', () => {
      expect(dateProvider.now()).toBeInstanceOf(Date);
    });

    it('should return right date now', () => {
      expect(dateProvider.now().getTime()).toBe(now.getTime());
    });
  });

  describe('add', () => {
    const date = new Date();
    it('should call method add when we call addDays', () => {
        const addSpy = vi.spyOn(dateProvider, 'add');
        dateProvider.addDays(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'day');
    });

    it('should call method add when we call addMonths', () => {
        const addSpy = vi.spyOn(dateProvider, 'add');
        dateProvider.addMonths(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'month');
    });

    it('should call method add when we call addYears', () => {
        const addSpy = vi.spyOn(dateProvider, 'add');
        dateProvider.addYears(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'year');
    });

    it('should call method add when we call addHours', () => {
        const addSpy = vi.spyOn(dateProvider, 'add');
        dateProvider.addHours(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'hour');
    });

    it('should call method add when we call addMinutes', () => {
        const addSpy = vi.spyOn(dateProvider, 'add');
        dateProvider.addMinutes(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'minute');
    });

    it('should call method add when we call addSeconds', () => {
        const addSpy = vi.spyOn(dateProvider, 'add');
        dateProvider.addSeconds(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'second');
    });
    it('should call method add when we call addMilliseconds', () => {
      const addSpy = vi.spyOn(dateProvider, 'add');
      dateProvider.addMilliseconds(date, 1);
      expect(addSpy).toHaveBeenCalledWith(date, 1, 'millisecond');
    });
  });

  describe('minus', () => {
    const date = new Date();
    it('should call method minus when we call addDays', () => {
        const addSpy = vi.spyOn(dateProvider, 'minus');
        dateProvider.minusDays(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'day');
    });

    it('should call method minus when we call addMonths', () => {
        const addSpy = vi.spyOn(dateProvider, 'minus');
        dateProvider.minusMonths(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'month');
    });

    it('should call method minus when we call addYears', () => {
        const addSpy = vi.spyOn(dateProvider, 'minus');
        dateProvider.minusYears(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'year');
    });

    it('should call method minus when we call addHours', () => {
        const addSpy = vi.spyOn(dateProvider, 'minus');
        dateProvider.minusHours(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'hour');
    });

    it('should call method minus when we call addMinutes', () => {
        const addSpy = vi.spyOn(dateProvider, 'minus');
        dateProvider.minusMinutes(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'minute');
    });

    it('should call method minus when we call addSeconds', () => {
        const addSpy = vi.spyOn(dateProvider, 'minus');
        dateProvider.minusSeconds(date, 1);
        expect(addSpy).toHaveBeenCalledWith(date, 1, 'second');
    });
    it('should call method minus when we call addMilliseconds', () => {
      const addSpy = vi.spyOn(dateProvider, 'minus');
      dateProvider.minusMilliseconds(date, 1);
      expect(addSpy).toHaveBeenCalledWith(date, 1, 'millisecond');
    });
  });

  describe('differenceInMilliseconds', () => {
      it('should call method differenceInMilliseconds when we call isBefore', () => {
            const differenceInMillisecondsSpy = vi.spyOn(dateProvider, 'differenceInMilliseconds');
            dateProvider.isBefore(new Date(), dateProvider.addDays(new Date(), 1));
            expect(differenceInMillisecondsSpy).toHaveBeenCalled();
      });

      it('should call method differenceInMilliseconds when we call isAfter', () => {
            const differenceInMillisecondsSpy = vi.spyOn(dateProvider, 'differenceInMilliseconds');
            dateProvider.isAfter(new Date(), dateProvider.addDays(new Date(), 1));
            expect(differenceInMillisecondsSpy).toHaveBeenCalled();
      });
  });

  describe('hasSame', () => {
      it('should call method hasSame when we call isToday', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isToday(new Date());
            expect(hasSameSpy).toHaveBeenCalled();
      });

    it('should call method hasSame when we call isTomorrow', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isTomorrow(new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

    it('should call method hasSame when we call isYesterday', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isYesterday(new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

    it('should call method hasSame when we call isSameYear', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isSameYear(new Date(), new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

    it('should call method hasSame when we call isSameMonth', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isSameMonth(new Date(), new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

    it('should call method hasSame when we call isSameDay', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isSameDay(new Date(), new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

    it('should call method hasSame when we call isSameHour', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isSameHour(new Date(), new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

    it('should call method hasSame when we call isSameMinute', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isSameMinute(new Date(), new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

    it('should call method hasSame when we call isSameSecond', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isSameSecond(new Date(), new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

    it('should call method hasSame when we call isSameMillisecond', () => {
            const hasSameSpy = vi.spyOn(dateProvider, 'hasSame');
            dateProvider.isSameMillisecond(new Date(), new Date());
            expect(hasSameSpy).toHaveBeenCalled();
    });

  });
});
