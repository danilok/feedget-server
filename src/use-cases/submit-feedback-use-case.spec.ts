import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

// spies - espiões
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment example',
      screenshot: 'data:image/png;base64,2342423423423'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'comment example',
      screenshot: 'data:image/png;base64,2342423423423'
    })).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,2342423423423'
    })).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should not be able to submit a feedback with invalid image', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment example',
      screenshot: 'test.jpg'
    })).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });
})