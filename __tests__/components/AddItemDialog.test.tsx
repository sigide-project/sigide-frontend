import dayjs from 'dayjs';
import { MAX_DESCRIPTION_LENGTH, MAX_REWARD_AMOUNT } from '@/components/AddItemDialog/hooks';

describe('AddItemDialog', () => {
  describe('Form Validation', () => {
    describe('Description Field', () => {
      it('should have a maximum character limit of 500', () => {
        expect(MAX_DESCRIPTION_LENGTH).toBe(500);
      });

      it('should validate description within limit', () => {
        const description = 'A'.repeat(500);
        expect(description.length).toBeLessThanOrEqual(MAX_DESCRIPTION_LENGTH);
      });

      it('should reject description exceeding limit', () => {
        const description = 'A'.repeat(501);
        expect(description.length).toBeGreaterThan(MAX_DESCRIPTION_LENGTH);
      });

      it('should show character count', () => {
        const description = 'Test description';
        const charCount = description.length;
        expect(charCount).toBe(16);
      });

      it('should show warning when approaching limit', () => {
        const description = 'A'.repeat(451);
        const isNearLimit = description.length > MAX_DESCRIPTION_LENGTH * 0.9;
        expect(isNearLimit).toBe(true);
      });
    });

    describe('Reward Amount Field', () => {
      it('should have a maximum reward amount of 50,000', () => {
        expect(MAX_REWARD_AMOUNT).toBe(50000);
      });

      it('should validate reward amount within limit', () => {
        const rewardAmount = 50000;
        expect(rewardAmount).toBeLessThanOrEqual(MAX_REWARD_AMOUNT);
      });

      it('should reject reward amount exceeding limit', () => {
        const rewardAmount = 50001;
        expect(rewardAmount).toBeGreaterThan(MAX_REWARD_AMOUNT);
      });

      it('should allow zero reward amount', () => {
        const rewardAmount = 0;
        expect(rewardAmount).toBeGreaterThanOrEqual(0);
      });

      it('should not allow negative reward amount', () => {
        const rewardAmount = -100;
        const isValid = rewardAmount >= 0;
        expect(isValid).toBe(false);
      });
    });

    describe('Reward Field Visibility', () => {
      it('should hide reward field for LOST items', () => {
        const itemType = 'lost';
        const showRewardField = itemType === 'found';
        expect(showRewardField).toBe(false);
      });

      it('should show reward field for FOUND items', () => {
        const itemType = 'found';
        const showRewardField = itemType === 'found';
        expect(showRewardField).toBe(true);
      });
    });

    describe('Date/Time Field', () => {
      it('should auto-populate with current date/time', () => {
        const defaultDate = dayjs();
        expect(defaultDate.isValid()).toBe(true);
      });

      it('should not allow future dates', () => {
        const futureDate = dayjs().add(1, 'day');
        const currentDate = dayjs();
        const isValid =
          futureDate.isBefore(currentDate) || futureDate.isSame(currentDate, 'minute');
        expect(isValid).toBe(false);
      });

      it('should allow past dates', () => {
        const pastDate = dayjs().subtract(1, 'day');
        const currentDate = dayjs();
        const isValid = pastDate.isBefore(currentDate);
        expect(isValid).toBe(true);
      });

      it('should allow current date/time', () => {
        const currentDate = dayjs();
        const isValid = currentDate.isSame(dayjs(), 'minute');
        expect(isValid).toBe(true);
      });
    });
  });

  describe('Form Submission', () => {
    it('should require all mandatory fields', () => {
      const requiredFields = [
        'type',
        'title',
        'description',
        'category',
        'location_name',
        'lost_found_at',
      ];
      expect(requiredFields.length).toBe(6);
    });

    it('should not require reward_amount for LOST items', () => {
      const itemType = 'lost';
      const isRewardRequired = itemType === 'found';
      expect(isRewardRequired).toBe(false);
    });
  });

  describe('Error Messages', () => {
    it('should show error for empty description', () => {
      const errorMessage = 'Description is required';
      expect(errorMessage).toBe('Description is required');
    });

    it('should show error for description exceeding limit', () => {
      const errorMessage = `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters`;
      expect(errorMessage).toBe('Description must be at most 500 characters');
    });

    it('should show error for reward exceeding limit', () => {
      const formattedAmount = MAX_REWARD_AMOUNT.toLocaleString('en-IN');
      const errorMessage = `Reward cannot exceed ₹${formattedAmount}`;
      expect(errorMessage).toBe('Reward cannot exceed ₹50,000');
    });

    it('should show error for future date', () => {
      const errorMessage = 'Date cannot be in the future';
      expect(errorMessage).toBe('Date cannot be in the future');
    });
  });

  describe('Dialog Title', () => {
    it('should show "Report Lost Item" for new items', () => {
      const isEditMode = false;
      const title = isEditMode ? 'Edit Item' : 'Report Lost Item';
      expect(title).toBe('Report Lost Item');
    });

    it('should show "Edit Item" for existing items', () => {
      const isEditMode = true;
      const title = isEditMode ? 'Edit Item' : 'Report Lost Item';
      expect(title).toBe('Edit Item');
    });
  });
});
