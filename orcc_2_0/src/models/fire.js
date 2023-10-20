export let model = {};
model.page = {
  pageNumber: '08',
  title: 'Fire',
  subTitle: 'Evidence of fire (smoke, odor, flash) on patient or drapes, or in patient’s airway, or in OR equipment'
};

model.stepSets = [
  /* 1st column */
  [
    {
      id: '100',
      main: 'Call for help',
      editable: true,
      addable: true,
      addableInfo: 'if you choose to include "activate fire alarm" here, you should delete it from step 4 under “NON-AIRWAY” and “OR EQUIPMENT” below',
      subContent: {
        contentType: 'action-list',
        items: [
          '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
          'Crisis manager designates checklist reader'
        ]
      },
      info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.'
    },

    {
      id: '101',
      main: 'Halt surgery, <span class="plain-text">if possible</span>',
    },

  ],

];
model.stepSetsBranchHeading = [
  "If <b>AIRWAY FIRE</b>",
  "If <b>NON-AIRWAY</b> patient fire",
  "If <b>OR EQUIPMENT</b> fire"
];
model.stepSetsBranch = [
  /* 1st column */
  [
    {
      id: '102',
      main: 'Attempt to extinguish fire',
      subContent: {
        contentType: 'action-list',
        items: [
          'Shut off medical gases',
          'Remove endotracheal tube',
          'Remove ﬂammable material from airway',
          'Pour saline in airway'
        ]
      }
    },
    {
      id: '103',
      main: 'After fire extinguished',
      subContent: {
        contentType: 'action-list',
        items: [
          {
            text: 'Re-establish ventilation using self-inflating bag with room air',
            subList: ['If unable to re-establish ventilation, <span class="screen-click-only" onclick="navigateTo(\'failed_airway\')"><em>go to</em> CHKLST 07</span>', 'Avoid N<sub>2</sub>O and minimize FiO<sub>2</sub>'],
          },
          {
            text: 'Confirm no secondary fire',
            subList: ['Check surgical field, drapes and towels'],
          },

          {
            text: 'Assess airway for injury or foreign body',
            subList: ['Assess ETT integrity (fragments may be left in airway)', 'Consider bronchoscopy'],
          },
        ]
      }
    },
    {
      id: '104',
      main: 'Assess patient status <span class="plain-text">and</span> devise ongoing management plan',
    },
    {
      id: '105',
      main: 'Save involved materials/devices <span class="plain-text">for examination</span> ',
    },

  ],

  /* 2nd column */
  [
    {
      id: '102',
      main: 'Obtain a fire extinguisher',
    },
    {
      id: '103',
      main: 'Attempt to extinguish fire',
      subContent: {
        contentType: 'action-list',
        items: [
          {
            text: 'Discontinue N<sub>2</sub>O and minimize FiO<sub>2</sub>',
            header: 'FIRST ATTEMPT',
            subList: [],
          },
          'Remove drapes / all flammable materials from patient',
          'If patient or drapes are on fire: extinguish burning materials with saline or saline-soaked gauze',
          {
            text: 'Use fire extinguisher (Class A and BC are safe in wounds)',
            header: 'If Fire PERSISTS',
            subList: [],
          },
          {
            text: 'Activate fire alarm',
            editable: true,
            deletable:true,
            info: 'Please add details about how to activate the fire alarm and/or alert the fire department at your facility.',
            subList: []
          },

        ]
      }
    },
    {
      id: '104',
      main: 'After fire extinguished',
      subContent: {
        contentType: 'action-list',
        items: [
          'Assess patient for injury at site of fire, and for inhalational injury if not intubated',
          {
            text: 'Confirm no secondary fire',
            subList: ['Check surgical field, drapes and towels'],
          },
        ]
      }
    },
    {
      id: '105',
      main: 'Devise ongoing management plan',
    },
    {
      id: '106',
      main: 'Save involved materials/devices <span class="plain-text">for examination</span> ',
    },
  ],
  /* 3rd column */
  [
    {
      id: '102',
      main: 'Obtain a fire extinguisher',
    },
    {
      id: '103',
      main: 'Attempt to extinguish fire',
      subContent: {
        contentType: 'action-list',
        items: [
          'Use CO<sub>2</sub> (Class BC) fire extinguisher (avoid liquids)',
          {
            header: 'If Fire PERSISTS',
            text: 'Evacuate patient',
            subList: [],
          },
          'Close OR door',
          'Turn OFF gas supply to room',
          {
            text: 'Activate fire alarm',
            editable: true,
            deletable:true,
            info: 'Please add details about how to activate the fire alarm and/or alert the fire department at your facility.',
            subList: []
          }
        ]
      }
    },
    {
      id: '104',
      main: 'After fire extinguished or patient evacuated',
      subContent: {
        contentType: 'action-list',
        items: [
          'Assess patient for injury at site of fire, and for inhalational injury if not intubated',
          {
            text: 'Confirm no secondary fire',
            subList: ['Check surgical field, drapes, and towels']
          }
        ]
      }
    },
    {
      id: '105',
      main: 'Devise ongoing patient management plan',
    },
    {
      id: '106',
      main: 'Save involved materials/devices <span class="plain-text">for examination</span> ',
    },
  ]

];

model.references = {
  'fire-extinguisher': {
    id: 'fire-extinguisher',
    header: 'FIRE EXTINGUISHER use',
    layout: 'vertical-sections',
    sections: [
      {
        contentType: 'text',
        contentItems: [
          '<b>P</b> - pull the pin',
          '<b>A</b> - aim at the base of the fire',
          '<b>S</b> - squeeze the handle',
          '<b>S</b> - sweep side to side',
        ],
      },
    ],
  },
};