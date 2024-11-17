import { getSession } from '@/app/_modules/sessions';

describe('Session Component Tests', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });

  it('Creates a new session in Leads DB and stores the id to cookies', async () => {
    cy.visit('/clicks');

    const cookie = cy.getCookie('sessionId');

    expect(cookie).to.not.equal(null);
  });

  it('Posts UTM data to Leads DB', async () => {
    const mockUTMData = {
      utm_source: 'source',
      utm_medium: 'medium',
      utm_campaign: 'campaign',
      utm_sub_id: 'sub123',
      utm_term: 'term',
      utm_content: 'content',
      utm_supplier_id: 'test',
      utm_id: 'test',
    };

    cy.visit(
      `/clicks?${Object.entries(mockUTMData)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`,
    );

    cy.getCookie('sessionId')
      .should('exist')
      .then(async (cookie) => {
        const sessionId = cookie?.value;

        expect(sessionId).to.not.equal(undefined);

        const sessionData = await getSession(+(sessionId ?? 0));
        expect(sessionData).to.not.equal(null);

        expect(sessionData?.utm_data?.source).to.equal(mockUTMData.utm_source);
        expect(sessionData?.utm_data?.medium).to.equal(mockUTMData.utm_medium);
        expect(sessionData?.utm_data?.campaign).to.equal(
          mockUTMData.utm_campaign,
        );
        expect(sessionData?.utm_data?.sub_id).to.equal(mockUTMData.utm_sub_id);
        expect(sessionData?.utm_data?.term).to.equal(mockUTMData.utm_term);
        expect(sessionData?.utm_data?.content).to.equal(
          mockUTMData.utm_content,
        );
        expect(sessionData?.utm_data?.supplier_id).to.equal(
          mockUTMData.utm_supplier_id,
        );
      });
  });

  it('Stores query params to localStorage', () => {
    const mockUTMData = {
      utm_source: 'source',
      utm_medium: 'medium',
      utm_campaign: 'campaign',
      utm_sub_id: 'sub123',
      utm_term: 'term',
      utm_content: 'content',
      utm_supplier_id: 'test',
      utm_id: 'test',
    };

    cy.visit(
      `/clicks?${Object.entries(mockUTMData)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`,
    );

    cy.getLocalStorage('queryParams').then((params) => {
      if (null == params) {
        cy.log('queryParams is null.');
        return;
      }

      const object = JSON.parse(params);
      expect(object?.utm_source).to.equal(mockUTMData.utm_source);
      expect(object?.utm_medium).to.equal(mockUTMData.utm_medium);
      expect(object?.utm_medium).to.equal(mockUTMData.utm_medium);
      expect(object?.utm_sub_id).to.equal(mockUTMData.utm_sub_id);
      expect(object?.utm_term).to.equal(mockUTMData.utm_term);
      expect(object?.utm_content).to.equal(mockUTMData.utm_content);
      expect(object?.utm_supplier_id).to.equal(mockUTMData.utm_supplier_id);
    });
  });

  it('Stores session data in localStorage', () => {
    const mockUTMData = {
      utm_source: 'source',
      utm_medium: 'medium',
      utm_campaign: 'campaign',
      utm_sub_id: 'sub123',
      utm_term: 'term',
      utm_content: 'content',
      utm_supplier_id: 'test',
      utm_id: 'test',
    };

    cy.visit(
      `/clicks?${Object.entries(mockUTMData)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`,
    );

    cy.getLocalStorage('leadRes').then((leadRes) => {
      if (null == leadRes) {
        cy.log('leadRes is null.');
        return;
      }

      const sessionData = JSON.parse(leadRes).session;
      expect(sessionData?.utm_data?.source).to.equal(mockUTMData.utm_source);
      expect(sessionData?.utm_data?.medium).to.equal(mockUTMData.utm_medium);
      expect(sessionData?.utm_data?.campaign).to.equal(
        mockUTMData.utm_campaign,
      );
      expect(sessionData?.utm_data?.sub_id).to.equal(mockUTMData.utm_sub_id);
      expect(sessionData?.utm_data?.term).to.equal(mockUTMData.utm_term);
      expect(sessionData?.utm_data?.content).to.equal(mockUTMData.utm_content);
      expect(sessionData?.utm_data?.supplier_id).to.equal(
        mockUTMData.utm_supplier_id,
      );
    });
  });
});
