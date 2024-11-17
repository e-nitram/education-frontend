import { CANDIMAVEN_BASE_URL } from '@/appConstants';
import { IAnswers } from '@/typings';

interface SubmitBody {
  accesskey: string;
  search_identifier: string;
  search_result_identifier: string;
  search_result_set_identifier: string;
  answers: IAnswers[] | [];
}

export const submitOffers = (body: SubmitBody) => {
  fetch(`${CANDIMAVEN_BASE_URL}/submit`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((_err) => {
      return;
    });
};
