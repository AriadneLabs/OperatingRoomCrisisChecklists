export let model = {};
model.page = {
  pageNumber: '13',
  title: 'Malignant Hyperthermia',
  subTitle: 'In presence of trigger agent: unexpected, unexplained increase in end-tidal CO2, unexplained tachycardia / tachypnea,masseter muscle spasm after succinylcholine. Hyperthermia is a late sign.'
};

model.stepSets = [
  /* 1st column */
  [
    {
      id: '100',
      main: 'Call for help and a code cart',
      subContent: {
        contentType: 'action-list',
        items: [
          '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
          'Crisis manager designates checklist reader'
        ]
      },
      editable: true,
      info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.'
    },
    {
      id: '101',
      main: 'Get Malignant Hyperthermia Kit',
      editable: true,
      info: 'Add location of malignant hyperthermia kit'
    },
    {
      id: '102',
      main: 'Call MH Hotline 1.800.644.9737',
      deletable: true,
      selectable: true,
      valueOptions: ['Call MH Hotline 1.800.644.9737', 'Call MH Hotline 001-209-417-3722'],
      info: 'This is a drop down menu where you can select MH Hotline number. For US select- 800-644-9737. For outside North America select 001-209-417-3722. If not applicable, delete this bullet.'
    },
    {
      id: '103',
      main: 'Assign dedicated person to mix dantrolene',
    },
    {
      id: '104',
      main: 'Open IV fluids <span class="plain-text">and</span> consider furosemide',
      subContent: {
        contentType: 'action-list',
        items: [
          'Goal urine output 1 - 2 mL/kg/hr',
        ]
      },
    },
    {
      id: '105',
      main: 'Turn off volatile anesthetics <span class="plain-text">and</span> transition to non-triggering <span class="plain-text">anesthetics</span>',
      subContent: {
        contentType: 'action-list',
        items: [
          '<u>DO NOT</u> delay treatment to change circuit or CO2 absorber',
          {
            text: 'Insert charcoal filters on inspiratory and expiratory limbs, if available',
            deletable: true,
            info: 'Delete if not available at your facility',
            subList: []
          }
        ]
      }
    },
    {
      id: '106',
      main: 'Turn FiO<sub>2</sub> to 100%',
    },
    {
      id: '107',
      main: 'Hyperventilate patient at flows of 10 L / min or more',
    },

    {
      id: '108',
      main: 'Terminate procedure, <span class="plain-text">if possible</span>',
    },
    {
      id: '109',
      main: 'Give dantrolene',
    },
    {
      id: '110',
      main: 'Give bicarbonate <span class="plain-text">if metabolic acidosis suspected (maintain pH >7.2)</span>',
    },
    {
      id: '111',
      main: 'Treat hyperkalemia, <span class="plain-text">if suspected</span>',
    },
  ], [
    {
      id: '112',
      main: 'Treat dysrhythmias, <span class="plain-text">if present</span>',
      subContent: {
        contentType: 'action-list',
        items: [
          'Standard antiarrhythmics are acceptable',
          '<u>DO NOT</u> use calcium channel blockers'
        ]
      }
    },
    {
      id: '113',
      main: 'Send labs',
      subContent: {
        contentType: 'action-list',
        items: [
          'Arterial blood gas',
          'Electrolytes',
          'Serum creatinine kinase (CK)',
          'Serum / urine myoglobin',
          'Coagulation profile'
        ]
      }
    },
    {
      id: '114',
      main: 'Initiate supportive care',
      subContent: {
        contentType: 'action-list',
        items: [
          {
            text: 'Cool patient  if >39  C:',
            subList: [
              'Lavage open body cavities',
              'Gastric lavage with cold water',
              'Apply ice externally',
              'Infuse cold saline IV',
              'STOP cooling when < 38 C',
            ],
          },
          'Place Foley catheter, monitor urine output',
          'Plan ICU monitoring for 24 hrs',
        ]
      },
    },
  ]
];

model.references = {
  'drug-doses': {
    id: 'drug-doses',
    header: 'DRUG DOSES & treatments',
    layout: 'vertical-sections-noseparator',
    sections: [
      {
        header: '',
        contentType: 'drug-table',
        tableWidth: 'narrow',
        drugs: [
          {
            options: [
              {
                name: 'Dantrolene',
                value: ['2.5 mg/kg, repeat up to 10 mg/kg until symptoms subside', 'Rarely, may require up to 30 mg/kg'],
                info: 'Please delete the below Dantrolene preparations if they are not available at your facility'
              },
              {
                name: 'Ryanodex',
                value: [
                  'Reconstitute 250mg vialS with 5 mL sterile water each (shake until orange)',
                  '2.5 mg/kg = 0.05 mL/kg',
                  '70kg patient dose = 3.5 mL (~1 vial)'
                ],
              },
              {
                name: '<em>- or -</em><br>Dantrium <span class="normal-weight">or</span> Revonto',
                value: ['Reconstitute 20 mg vials with 60 mL sterile water',
                  '2.5 mg/kg = 7.5 mL/kg',
                  '70kg patient dose = 525 mL (~9 vials)',],
              },
              {
                name: 'Bicarbonate',
                value: '1 - 2 mEq/kg slow IV push',
              },
              {
                name: 'Furosemide',
                value: '40 mg IV',
              },
            ],
          },
        ],
      },
      {
        header: 'HYPERKALEMIA treatment',
        contentType: 'drug-table',
        tableWidth: 'normal',
        drugs: [
          {
            options: [
              {
                name: 'Calcium gluconate<br><em>- or -</em><br>Calcium chloride',
                value: '1-3g IV<br><br>0.5-1g IV',
              },
              {
                name: 'Insulin<br><em>- and -</em><br>Dextrose',
                value: '5 - 10 units regular IV<br><br>50 - 100 mL D50W IV<br><em>- or -</em><br>250 - 500 mL D10W IV'
              },
            ],
          },
        ],
      }
    ],
  },

  'differential-diagnosis': {
    id: 'differential-diagnosis',
    header: 'DIFFERENTIAL diagnosis (consider when using high doses of dantrolene without resolution of symptoms)',
    layout: 'horizontal-sections-noseparator',
    sections: [
      {
        header: '',
        contentType: 'text',
        contentItems: [
          '<b>Cardiorespiratory</b>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Hypoventilation</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Sepsis</div></div>',
          '<br>',
          '<b>Endocrine</b>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Thyrotoxicosis</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Pheochromocytoma</div></div>',
        ]
      },
      {
        header: '',
        contentType: 'text',
        contentItems: [
          '<b>Iatrogenic</b>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Exogenous CO2 source (e.g. laparoscopy)</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Overwarming</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Neuroleptic Malignant Syndrome</div></div>',
        ]
      },
      {
        header: '',
        contentType: 'text',
        contentItems: [
          '<b>Neurologic</b>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Meningitis</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Intracranial bleed</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Hypoxic encephalopathy</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Traumatic brain injury</div></div>',
        ]
      },
      {
        header: '',
        contentType: 'text',
        contentItems: [
          '<b>Toxicology</b>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Radiologic contrast neurotoxicity</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Anticholinergic syndrome</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Cocaine, amphetamine, salicylate toxicity</div></div>',
          '<div style="height: auto;margin-bottom: 0.2rem;"><span style="color: grey;display: table-cell;">•&nbsp;</span><div style="display:table-cell;"> Alcohol withdrawal</div></div>',
        ]
      },
    ],
  },
};