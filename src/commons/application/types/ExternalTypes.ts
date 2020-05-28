/**
 * Defined for displaying an external library.
 * @see Library the definition of a Library at AssessmentTypes.ts in an assessment.
 */
export type External = {
  key: number;
  name: ExternalLibraryName;
  symbols: string[];
};

export enum ExternalLibraryNames {
  NONE = 'NONE',
  RUNES = 'RUNES',
  CURVES = 'CURVES',
  SOUNDS = 'SOUNDS',
  BINARYTREES = 'BINARYTREES',
  PIXNFLIX = 'PIX&FLIX',
  MACHINELEARNING = 'MACHINELEARNING',
  ALL = 'ALL'
}

export type ExternalLibraryName = (typeof ExternalLibraryNames)[keyof typeof ExternalLibraryNames];

export type ExternalLibrary = {
  name: ExternalLibraryName;
  symbols: string[];
};

const runesLibrary = [
  'show',
  'color',
  'random_color',
  'red',
  'pink',
  'purple',
  'indigo',
  'blue',
  'green',
  'yellow',
  'orange',
  'brown',
  'black',
  'white',
  'scale_independent',
  'scale',
  'translate',
  'rotate',
  'stack_frac',
  'stack',
  'stackn',
  'quarter_turn_right',
  'quarter_turn_left',
  'turn_upside_down',
  'beside_frac',
  'beside',
  'flip_vert',
  'flip_horiz',
  'make_cross',
  'repeat_pattern',
  'square',
  'blank',
  'rcross',
  'sail',
  'corner',
  'nova',
  'circle',
  'heart',
  'pentagram',
  'ribbon',
  'anaglyph',
  'overlay_frac',
  'overlay',
  'hollusion' // currently not documented; animation not working
];

const curvesLibrary = [
  'make_point',
  'draw_points_on',
  'draw_connected',
  'draw_points_squeezed_to_window',
  'draw_connected_squeezed_to_window',
  'draw_connected_full_view',
  'draw_connected_full_view_proportional',
  'x_of',
  'y_of',
  'unit_line',
  'unit_line_at',
  'unit_circle',
  'connect_rigidly',
  'connect_ends',
  'put_in_standard_position',
  'translate',
  'scale',
  /** Contest functions */
  'rotate_pi_over_2',
  'scale_x_y',
  'gosperize',
  'gosper_curve',
  'show_connected_gosper',
  'repeated',
  'param_gosper',
  'param_gosperize',
  'rotate_around_origin',
  'arc', // used in GOSPERIZE
  'invert', // used in DRAGONIZE
  'alternative_unit_circle', // undocumented
  'full_view_proportional', // undocumented
  'squeeze_full_view', // undocumented
  'squeeze_rectangular_portion' // undocumented
];

const soundsLibrary = [
  'make_sound',
  'get_wave',
  'get_duration',
  'play',
  'stop',
  'consecutively',
  'simultaneously',
  'noise_sound',
  'sine_sound',
  'silence_sound',
  'letter_name_to_midi_note',
  'letter_name_to_frequency',
  'midi_note_to_frequency',
  'square_sound',
  'triangle_sound',
  'sawtooth_sound',
  'play_unsafe',
  'display_waveform',
  /** Microphone Sounds */
  'init_record',
  'record',
  'record_for',
  /** Contest functions */
  'adsr',
  'stacking_adsr',
  'trombone',
  'piano',
  'bell',
  'violin',
  'cello'
];

const binaryTreesLibrary = [
  'make_empty_tree',
  'is_tree',
  'make_tree',
  'is_empty_tree',
  'entry',
  'left_branch',
  'right_branch'
];

const videoLibrary = [
  'red_of',
  'green_of',
  'blue_of',
  'set_rgb',
  'copy_pixel',
  'copy_image',
  'constrain_color',
  'compose_filter',
  'make_distortion_filter',
  'make_static_distortion_filter',
  'pixel_similar',
  'get_video_width',
  'get_video_height',
  'apply_filter',
  'reset_filter'
];

const machineLearningLibrary = [
  'init_webcam',
  'train_recognition',
  'load_faceapi',
  'change_label',
  'array_push',
  'normalise_data'
];

/**
 * Defines which external libraries are available for usage, and what
 * external symbols (exposed functions) are under them.
 */

const libEntries: Array<[ExternalLibraryName, string[]]> = [
  [ExternalLibraryNames.NONE, []],
  [ExternalLibraryNames.RUNES, runesLibrary],
  [ExternalLibraryNames.CURVES, curvesLibrary],
  [ExternalLibraryNames.SOUNDS, soundsLibrary],
  [ExternalLibraryNames.BINARYTREES, binaryTreesLibrary],
  [ExternalLibraryNames.PIXNFLIX, videoLibrary],
  [ExternalLibraryNames.MACHINELEARNING, machineLearningLibrary],
  [
    ExternalLibraryNames.ALL,
    runesLibrary.concat(curvesLibrary, soundsLibrary, binaryTreesLibrary, videoLibrary)
  ]
];

export const externalLibraries: Map<string, string[]> = new Map(libEntries);