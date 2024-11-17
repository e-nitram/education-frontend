import { CANDIMAVEN_BASE_URL } from '@/appConstants';

interface IRequestBody {
  search_identifier: string;
}

export interface School {
  brand_name: string;
  clientid: string;
  consent: string;
  is_exclusive: 'true' | 'false';
  location: string;
  logo: string;
  online: boolean;
  payout: number;
  questions?: Question[];
  answers?: Answer[];
  result_type: string;
  school: string;
  schoolid: string;
  state: string;
  programs: Program[];
  status?: boolean;
}

export interface Question {
  IsVisible: boolean;
  QuestionDescription: string | null;
  QuestionFieldName: string;
  QuestionLabel: string;
  QuestionNotes: string | null;
  QuestionOptions: {
    OptionLabel: string;
    OptionValue: string;
  }[];
  QuestionRequired: boolean;
  QuestionType: 'DropDown' | 'TextBox' | 'HiddenField';
  QuestionValue: string | null;
  Rules: string | null;
}

export interface Answer {
  question_key: string;
  question_value: string;
  label?: string;
}

export interface Program {
  name: string;
  result_identifier: string;
  result_set_identifier: string;
  degree_level: string;
}

/**
 * Uses the callback function of the Offers API to get search results. API returns an array of programs. Restructures this array into an object that relates programs under their school.
 *
 * @param data
 * @returns
 */
export async function getResults(data: IRequestBody): Promise<School[] | null> {
  const body = {
    accesskey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    search_identifier: data.search_identifier,
  };

  try {
    const response = await fetch(`${CANDIMAVEN_BASE_URL}/results`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const programs = await response.json();
    const schools: School[] = [];

    programs.forEach(
      (program: {
        result_set_identifier: string;
        result_identifier: string;
        brand_name: string;
        clientid: string;
        consent: string;
        degree_level: string;
        distance_miles: number;
        is_exclusive: 'true' | 'false';
        location: string;
        logo: string;
        online: boolean;
        payout: number;
        program: string;
        questions: Question[];
        result_type: string;
        school: string;
        schoolid: string;
        state: string;
      }) => {
        const schoolId = program.schoolid;
        const inArray = schools.findIndex(
          (school) => school.schoolid === schoolId,
        );

        if (0 <= inArray) {
          schools[inArray].payout = Math.max(
            schools[inArray].payout,
            program.payout,
          );
          // If the school already exists, add the program to its programs array
          schools[inArray].programs.push({
            name: program.program,
            result_identifier: program.result_identifier,
            result_set_identifier: program.result_set_identifier,
            degree_level: program.degree_level,
          });
        } else {
          // Check for hidden questions and answer them by default
          const answers: Answer[] = [];

          if (null != program.questions) {
            program.questions.forEach((question) => {
              if ('HiddenField' == question.QuestionType) {
                answers.push({
                  question_key: question.QuestionFieldName,
                  question_value: question.QuestionValue ?? '',
                });
              }
            });
          }

          // Otherwise create a new school and add the program to the programs array
          schools.push({
            brand_name: program.brand_name,
            clientid: program.clientid,
            consent: program.consent,
            is_exclusive: program.is_exclusive,
            location: program.location,
            logo: program.logo,
            online: program.online,
            payout: program.payout,
            questions: program.questions,
            answers: answers,
            result_type: program.result_type,
            school: program.school,
            schoolid: program.schoolid,
            state: program.state,
            programs: [
              {
                name: program.program,
                result_identifier: program.result_identifier,
                result_set_identifier: program.result_set_identifier,
                degree_level: program.degree_level,
              },
            ],
          });
        }
      },
    );

    return schools.sort((a, b) => b.payout - a.payout);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to get thank you results', error);
    return null;
  }
}
