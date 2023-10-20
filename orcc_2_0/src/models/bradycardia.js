export let model = {};
model.page = {
  pageNumber: '03',
  title: 'Bradycardia – Unstable',
  subTitle: 'HR < 50 bpm with hypotension, acutely altered mental status, shock, ischemic chest discomfort, or acute heart failure'
};

model.stepSets = [
  /* 1st column */
  [
    {
      id: '100',
      main: 'Call for help and a code cart',
      editable: true,
      info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.',
      subContent: {
        contentType: 'action-list',
        items: [
          '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
          'Crisis manager designates checklist reader'
        ]
      }
    },
    {
      id: '101',
      main: 'Turn FiO<sub>2</sub> to 100%',
      subContent: {
        contentType: 'action-list',
        items: [
          'Verify oxygenation/ventilation adequate',
          'Consider securing airway'
        ]
      }
    },

    {
      id: '102',
      main: 'Administer atropine'
    },

    {
      id: '103',
      main: 'Stop surgical stimulation <span class="plain-text">(if laparoscopy, desufflate)</span>'
    },

    {
      id: '103',
      main: 'If atropine ineffective:',
      subContent: {
        contentType: 'action-list',
        items: [
          'Consider EPINEPHrine or DOPamine<br><em>- or -</em>',
          'Start transcutaneous pacing (see box)',
        ]
      }
    },

    {
      id: '104',
      main: 'Consider...',
      subContent: {
        contentType: 'action-list',
        items: [
          'Assessing and treating underlying  etiology (see differential diagnosis box)',
          'If hemodynamically unstable, minimizing  volatile anesthetics',
          'Calling cardiology consult'
        ]
      }
    },

    {
      id: '105',
      main: 'If bradycardia progresses to asystole or PEA arrest',
      subContent: {
        contentType: 'action-list',
        items: [
          '<span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_pea_asystole\')"><em>go to</em> CHKLST 04</span>'
        ]
      }
    }
  ]

];

model.references = {
  'trancutaneous-pacing-instructions': {
    id: 'trancutaneous-pacing',
    header: 'TRANSCUTANEOUS PACING instructions',
    layout: 'vertical-sections',
    sections: [
      {
        contentType: 'numbered-list',
        editable: true,
        info: 'Please edit instructions for use to be specific to your institution’s device(s).',
        contentItems: [{
          main: "Place pacing electrodes front and back",
          editable: true,
          deletable: true,
        },
        {
          main: "Connect 3-lead ECG from pacing defibrillator",
          editable: true,
          deletable: true,
        },
        {
          main: "Turn monitor/defibrillator to PACER mode",
          editable: true,
          deletable: true,
        },
        {
          main: "Set PACER RATE (bpm) to 80/minute (adjust based on clinical response once pacing is established)",
          editable: true,
          deletable: true,
        },
        {
          main: "Start at 60 mA of PACER OUTPUT and increase until electrical capture (pacer spikes aligned with QRS complex)",
          editable: true,
          deletable: true,
        },
        {
          main: "Set final milliamperes 10 mA above initial capture level",
          editable: true,
          deletable: true,
        },
        {
          main: "Confirm effective capture",
          editable: true,
          deletable: true,
          subContents: [
            'Electrically: assess ECG tracing',
            'Mechanically: palpate femoral pulse'
          ]
        }],

      },
    ]
  },
  'differential-diagnosis': {
    id: 'differential-diagnosis',
    header: 'DIFFERENTIAL diagnosis',
    layout: 'horizontal-sections-noseparator',
    sections: [
      {
        header: '',
        contentType: 'drug-table',
        tableWidth: 'wide',
        drugs: [
          {
            options: [
              {
                name: 'Drug effect or overdose<br>Tension pneumothorax<br>Auto-PEEP<br>Surgical stimulation<br>High spinal<br>Acidosis',
                value: 'Hyperkalemia<br>Hypothermia<br>Hypovolemia<br>Local anesthesia systemic toxicity <span class="screen-click-only" onclick="navigateTo(\'last\')">(CHKLST 12)</span><br>Malignant Hyperthermia <span class="screen-click-only" onclick="navigateTo(\'malignant_hyperthermia\')">(CHKLST 13)</span><br>Myocardial ischemia <span class="screen-click-only" onclick="navigateTo(\'myocardial_ischemia\')">(CHKLST 14)</span>',
              },
            ],
          },
        ],
      },
    ]
  },
  'drug-doses': {
    id: 'drug-doses',
    header: 'DRUG DOSES & treatments',
    layout: 'vertical-sections-noseparator',
    sections: [
      {
        header: '',
        contentType: 'drug-table',
        drugs: [
          {
            options: [
              {
                name: 'Atropine',
                value: '0.5 - 1 mg IV, may repeat up to 3 mg total',
              },

              {
                name: 'EPINEPHrine',
                value: [
                  'BOLUS: 10 - 100 MCG IV, repeat as needed',
                  {
                    defaultValue: '1 mg in 100 mL = 10 MCG/mL',
                    selectable: true,
                    deletable: true,
                    valueOptions: ['1 mg in 100 mL = 10 MCG/mL', '2mg in 100 mL = 20 MCG/mL', '1 mg in 250 mL = 4 MCG/mL', '2 mg in 250 mL = 8 MCG/mL', '1 mL of 100 MCG/mL in 9 mL = 10 MCG/mL'],
                    info: 'This is a drop down menu where you can select from methods of preparing dilute EPINEPHrine for bolus administration. You can delete the dilution instructions if desired.'
                  },
                  {
                    defaultValue: 'INFUSION: 0.01 - 0.1 MCG/kg/min',
                    selectable: true,
                    valueOptions: ['INFUSION: 0.01 - 0.1 MCG/kg/min', 'INFUSION: 1 - 10 MCG/min'],
                    info: 'This is a drop down menu where you can select from dose ranges for MCG/min or MCG/kg/min.'
                  },
                ]
              },
              {
                name: '&emsp; <em>- or -</em><br>DOPamine',
                value: '<br>2 - 20 MCG/kg/min IV infusion',
              },
            ],
          },
        ],
      },
      {
        header: 'OVERDOSE treatment',
        contentType: 'drug-table',
        tableWidth: 'wide',
        drugs: [
          {
            options: [
              {
                name: '<em>Beta-blocker</em> ',
                value: '<b>Glucagon</b>  5 - 10 mg IV push',
              },

              {
                name: '<em>Calcium channel blocker</em>',
                value:
                  '<b>Calcium chloride</b> 1g IV <br><em>- or -</em>',
              },
              {
                name: '',
                value:
                  '<b>Calcium gluconate</b> 3g IV',
              },
              {
                name: '<em>Digoxin</em>',
                value: '<b>Digoxin FAB;</b> consult pharmacy for patient-specific dosing',
              }
            ],
          },
        ],
      },
    ],
  },

};