<?php

namespace App\Services;

use Illuminate\Http\Request;
use Ixudra\Curl\Facades\Curl;
use App\Model\Category;

class helperService
{


    public static function post(Request $request)
    {
        $search_string = $request->search;
        $search_type = $request->search_type;
        $start = 0;
        $size = 10;
        $page = $request->page;
        if ($page) {
            $start = ($page - 1) . '0';
        }
        if (isset($start) && isset($size)) {
            if ($request->search_type == "All") {
                $api = config('constant.elastic_api') . '/posts,responses,tags,questions,answers,comments/_search?' . 'from=' . $start . '&size=' . $size;
                $data = [
                    "query" => [
                        "bool" => [
                            "should" => [
                                "multi_match" => [
                                    "fields" => [
                                        "title^6",
                                        "html_content^5",
                                        "tag_name^4",
                                        "description^3",
                                        "question^2",
                                        "answers^2",
                                        "comment^1"
                                    ],
                                    "query" => $search_string,
                                    "analyzer" => "html_strip_analyzer",
                                    "fuzziness" => "auto"
                                ]
                            ]
                        ]
                    ],

                    "highlight" => [
                        "pre_tags" => ["<em class='hlt1'>"],
                        "post_tags" => ["</em>"],
                        "fields" => [
                            "title" => [
                                'type' => 'plain'

                            ],
                            "html_content" => [
                                'type' => 'unified'
                            ],
                            "tag_name" => [
                                'type' => 'plain'
                            ],
                            "description" => [
                                'type' => 'plain'
                            ],
                            "question" => [
                                'type' => 'plain'
                            ],
                            "answers" => [
                                'type' => 'plain'
                            ],
                            "comment" => [
                                'type' => 'plain'
                            ]
                        ]
                    ]
                ];


            } elseif ($request->search_type == "Tags") {
                $api = config('constant.elastic_api') . '/tags/_search?' . 'from=' . $start . '&size=' . $size;
                $data = [
                    "query" => [
                        "bool" => [
                            "should" => [
                                "multi_match" => [
                                    "fields" => [
                                        "tag_name^5",
                                        "description^3",
                                    ],
                                    "query" => $search_string,
                                    "fuzziness" => "auto"
                                ]
                            ]
                        ]
                    ],
                    "highlight" => [
                        "pre_tags" => ["<em class='hlt1'>"],
                        "post_tags" => ["</em>"],
                        "fields" => [
                            "tag_name" => [
                                'type' => 'plain'
                            ],
                            "description" => [
                                'type' => 'plain'
                            ]
                        ]
                    ]

                ];
            } else {
                $category = Category::where('type', $request->search_type)->first();
                if (isset($category)) {
                    $api = config('constant.elastic_api') . '/posts,responses,questions,answers,comments/_search?' . 'from=' . $start . '&size=' . $size;
                    $data = [
                        "query" => [
                            "bool" => [
                                "should" => [
                                    "multi_match" => [
                                        "fields" => [
                                            "title",
                                            "html_content",
                                            "question",
                                            "answers",
                                            "comment"
                                        ],
                                        "query" => $search_string,
                                        "analyzer"=>"html_strip_analyzer",
                                        "fuzziness" => "auto"
                                    ]
                                ],
                                "filter" => [
                                    "term" => [
                                        "categories_id" => $category->id
                                    ]
                                ]
                            ]
                        ],
                        "highlight" => [
                            "pre_tags" => ["<em class='hlt1'>"],
                            "post_tags" => ["</em>"],
                            "fields" => [
                                "title" => [
                                    'type' => 'plain'
                                ],
                                "html_content" => [
                                    'type' => 'unified'
                                ],
                                "question" => [
                                    'type' => 'plain'
                                ],
                                "answers" => [
                                    'type' => 'plain'
                                ],
                                "comment" => [
                                    'type' => 'plain'
                                ]
                            ]
                        ]

                    ];


                }
            }
        }
        $response = Curl::to($api)->withData($data)->asJson()->post();
        return $response;
    }

}
